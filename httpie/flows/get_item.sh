# http [flags] [METHOD] URL [ITEM [ITEM]]
echo "Should get Flow with associated Tasks"
http GET http://localhost:3000/flows/1
# invalid id
echo "Should return nothing"
http GET http://localhost:3000/flows/99

