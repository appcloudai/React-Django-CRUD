from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.serializers import crudAppSerializer
from app.models import crudApp


@api_view(['GET', 'POST'])
def crud_get_post(request):

	if request.method == 'GET':
		queryset = crudApp.objects.all().order_by('-date_created')
		serializer_class = crudAppSerializer(queryset, many=True)
		return Response(serializer_class.data)

	elif request.method == 'POST':
		serializer_class = crudAppSerializer(data=request.data)
		if serializer_class.is_valid():
			serializer_class.save()
		return Response("item is added to the Database")


@api_view(['PUT', 'DELETE'])
def crud_update_delete(request,pk):

	if request.method == 'PUT':
		queryset = crudApp.objects.get(id=pk)
		serializer_class = crudAppSerializer(instance=queryset, data=request.data)
		if serializer_class.is_valid():
			serializer_class.save()
		return Response("item is Updated")

	elif request.method == 'DELETE':
		queryset = crudApp.objects.get(id=pk)
		queryset.delete()
		return Response("item is removed from the Database")


