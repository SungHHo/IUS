cd ./web
rm -rf ../backend/public
mkdir ../backend/public
npm install
npm run build

sleep 3s
mv ./build/* ../backend/public/ 