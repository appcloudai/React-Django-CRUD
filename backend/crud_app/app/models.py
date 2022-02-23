from django.db import models
from datetime import datetime

 
class crudApp(models.Model):
  title = models.CharField(max_length=200)
  date_created = models.DateTimeField(default=datetime.now, blank=True)
 
      
  def __str__(self):
    return self.title