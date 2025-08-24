from django.shortcuts import render
from django.http import JsonResponse
from .chatbot import ask_gemini  # <-- FIXED import

def chatbot(request):
    return render(request, 'chatbot.html')  # <-- changed from 'home.html'

def chatbot_view(request):
    question = request.GET.get("q", "Hello")
    try:
        answer = ask_gemini(question)
    except Exception as e:
        answer = "Sorry, I couldn't process your request."
    return JsonResponse({
        "question": question,
        "answer": answer
    })