# http [flags] [METHOD] URL [ITEM [ITEM]]
echo "should get 404"
http PUT http://localhost:3000/tasks/1 \
    title='PUT API test' \
    flow_id=1 \
    type='break'
echo "should get 400"
http PUT http://localhost:3000/flows/99/tasks/1 \
    title='PUT API test' \
    type='break'
echo "should update the given fields"
http PUT http://localhost:3000/flows/1/tasks/1 \
    title='PUT API test NESTED' \
    hours=95 \
    type='break'
echo "should update the given fields"
http PUT http://localhost:3000/flows/1/tasks/2 \
    minutes=55 \
    type='focus'
echo "should update the given fields"
http PUT http://localhost:3000/flows/1/tasks/4 \
    seconds=35 \
    type='break'
echo "should update the given fields except type"
http PUT http://localhost:3000/flows/1/tasks/1 \
    type='invalid'
