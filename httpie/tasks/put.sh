# http [flags] [METHOD] URL [ITEM [ITEM]]
http PUT http://localhost:3000/tasks/1 \
    title='PUT API test' \
    flow_id=1 \
    type='break'
http PUT http://localhost:3000/tasks/2 \
    hours=99 \
    flow_id=1 \
    type='focus'
http PUT http://localhost:3000/tasks/3 \
    minutes=59 \
    flow_id=95 \
    type='break'
http PUT http://localhost:3000/tasks/4 \
    seconds=37 \
    flow_id=1 \
    type='invalid'
