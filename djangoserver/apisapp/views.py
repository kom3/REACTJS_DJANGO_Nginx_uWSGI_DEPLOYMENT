from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.http import HttpResponse
import json

# Create your views here.


# BELOW setcsrf view function IS TO ISSUE THE CSRF TOKEN TO FRONT END SERVER
# @ensure_csrf_cookie (TO SEND CSRF TOKEN THROUGH RESPONSE HEADER) AND
# @csrf_exempt (TO AVOID CSRF RESTRICTION INITIALLY)

@csrf_exempt
@ensure_csrf_cookie
def setcsrf(request):
    # request.session["dummysession"] = "set"
    return HttpResponse(json.dumps({"response":"setting cookies..."}), content_type="text/json")

def add(request):
    if request.method == "POST":
        print(type(request.POST))
        a = int(request.POST["a"])
        b = int(request.POST["b"])
        print(a+b)
        if isinstance(a, int) and isinstance(b, int):
            return HttpResponse(str(a+b))
        else:
            return HttpResponse("invalid type, supports only addtion of integers!")
    else:
        return HttpResponse("Server is up and running!!!")