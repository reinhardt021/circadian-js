# http [flags] [METHOD] URL [ITEM [ITEM]]
echo "should get 404"
http POST http://localhost:3000/tasks title='INSERT ITEM' \
    hours=0 \
    minutes=3 \
    seconds=21 \
    type='break'
echo "should get 400"
http POST http://localhost:3000/flows/99/tasks title='INSERT ITEM' \
    hours=777 \
    minutes=55 \
    seconds=33 \
    type='break'
echo "should post successfully"
http POST http://localhost:3000/flows/1/tasks title='INSERT ITEM' \
    hours=777 \
    minutes=55 \
    seconds=33 \
    type='break'
