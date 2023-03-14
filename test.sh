#curl http://localhost:3000/

curl -H 'Content-Type: application/json' \
    -d '{ "phone":952514033960,"password":"12345"}' \
    -X POST \
  http://localhost:3000/login

# curl -H 'Content-Type: application/json' \
#     -d '{ "phone":9525140960,"password":"12345"}' \
#     -X POST \
#   http://localhost:3000/create