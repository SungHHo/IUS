cd ./web
npm install
npm run build

# backend의 public 폴더로 이동(경로는 실제 상황에 맞게 조정해주세요)
mv ./build/* ../backend/public/