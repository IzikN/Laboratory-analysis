from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import AnalysisResult
from .serializers import AnalysisResultSerializer
import openai  # For AI-generated insights

#OpenAI API key
openai.api_key = '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'

@api_view(['POST'])
def create_analysis(request):
    serializer = AnalysisResultSerializer(data=request.data)
    if serializer.is_valid():
        # Save analysis result
        analysis = serializer.save()

        # Generate AI insights
        ai_prompt = f"Analyze the following lab results: Moisture {analysis.moisture}%, Ash {analysis.ash}%, Protein {analysis.crude_protein}%, Fat {analysis.crude_fat}%, Fiber {analysis.fiber}%, Carbohydrates {analysis.carbohydrates}%, Gross Energy {analysis.gross_energy} kcal/g, Vitamin A {analysis.vitamin_a} IU, Vitamin C {analysis.vitamin_c} mg."
        
        ai_response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": ai_prompt}]
        )
        analysis.ai_analysis = ai_response['choices'][0]['message']['content']
        analysis.save()

        return Response(serializer.data)
    
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def list_analyses(request):
    analyses = AnalysisResult.objects.all().order_by('-date_of_analysis')
    serializer = AnalysisResultSerializer(analyses, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_analysis(request, reference_id):
    try:
        analysis = AnalysisResult.objects.get(reference_id=reference_id)
        serializer = AnalysisResultSerializer(analysis)
        return Response(serializer.data)
    except AnalysisResult.DoesNotExist:
        return Response({'error': 'Analysis not found'}, status=404)
