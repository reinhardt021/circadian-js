# http [flags] [METHOD] URL [ITEM [ITEM]]
echo "should give 404"
http GET http://localhost:3000/tasks/1
echo "should give 400"
http GET http://localhost:3000/flows/99/tasks/1
echo "should get task"
http GET http://localhost:3000/flows/1/tasks/1

