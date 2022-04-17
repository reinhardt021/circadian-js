# http [flags] [METHOD] URL [ITEM [ITEM]]
http PUT http://localhost:3000/tasks/1 \
    title='PUT API test' \
    type='break'
http PUT http://localhost:3000/tasks/2 \
    hours=99 \
    type='focus'
http PUT http://localhost:3000/tasks/3 \
    minutes=59 \
    type='break'
http PUT http://localhost:3000/tasks/4 \
    seconds=37 \
    type='invalid'
