# http [flags] [METHOD] URL [ITEM [ITEM]]
http PUT http://localhost:3000/tasks/1 \
    title='PUT API test'
http PUT http://localhost:3000/tasks/2 \
    hours=99
http PUT http://localhost:3000/tasks/3 \
    minutes=5
http PUT http://localhost:3000/tasks/4 \
    seconds=7
