# http [flags] [METHOD] URL [ITEM [ITEM]]
http GET http://localhost:3000/tasks

#EXAMPLE:
#$ sh ./httpie/tasks/get.sh
#HTTP/1.1 200 OK
#Connection: keep-alive
#Content-Length: 9
#Content-Type: text/html; charset=utf-8
#Date: Tue, 12 Apr 2022 09:45:08 GMT
#ETag: W/"9-r+k9J6+HtYDsL56p/bHbbsLDrYU"
#Keep-Alive: timeout=5
#X-Powered-By: Express

#GET TASKS
