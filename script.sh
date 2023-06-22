cd ./web
rm -rf ../backend/public
mkdir ../backend/public
npm install
npm run build

mv ./build/* ../backend/public/ 