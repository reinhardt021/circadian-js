# http [flags] [METHOD] URL [ITEM [ITEM]]
echo "should give 404"
http DELETE http://localhost:3000/tasks/6
echo "should give 400"
http DELETE http://localhost:3000/flows/99/tasks/6
echo "should delete task"
http DELETE http://localhost:3000/flows/1/tasks/9
# TODO: check to see if tasks still exists

