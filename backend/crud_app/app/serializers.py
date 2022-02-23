from rest_framework import serializers
from .models import crudApp

class crudAppSerializer(serializers.ModelSerializer):
	
	class Meta:
		model = crudApp
		fields ='__all__'