# International Unified Squad - 대밥

해커그라운드 해커톤에 참여하는 International Unified Squad 팀의 '대밥'입니다.

## 제품/서비스 소개

<!-- 아래 링크는 지우지 마세요 -->
[제품/서비스 소개 보기](TOPIC.md)
<!-- 위 링크는 지우지 마세요 -->

## 오픈 소스 라이센스

<!-- 아래 링크는 지우지 마세요 -->
[오픈소스 라이센스 보기](./LICENSE)
<!-- 위 링크는 지우지 마세요 -->

## 설치 방법

### 사전 준비 사항

* Azure-CLI
* Azure Account
* Github-CLI
* Github Account
* Azure Resource Group
* [Naver cloud platform](https://console.ncloud.com/dashboard)

## 시작하기
시작하기 전에, Naver cloud platform에 maps API를 등록해 주세요

## 1. cloud platform console에 접속
## 2. 새로운 application 등록
## 3. maps에 아래에 해당하는 항목들 체크
   ## ![image](https://github.com/hackersground-kr/IUS/assets/137250351/19d3e47d-955e-4d06-b876-b974a50d3d80)
## 4. azure에서 static site의 webApp domain을 아래 **서비스 환경 등록**에 등록해 주세요.
   ## ![image](https://github.com/hackersground-kr/IUS/assets/137250351/fc56399f-b7d9-4425-acf3-445c9992dc33)

## naver cloud platform 

이 프로젝트를 자신의 깃헙에 포킹하세요.

포킹한 아이디는 deployment에 쓰입니다.

<br>

```
다음 백엔드 자동화 툴을 다운받으세요.  (윈도우 파워쉘 스크립트)
```

[백엔드 자동화 툴](./auto-deploy-project.ps1)

```
프로비저닝과 깃허브 workflows 세팅을 도와줍니다.
```

<br>

```
다운 후 우클릭 -> Powershell에서 실행
```

<br>

```
위 프로세스 실행 후 필요한 정보들을 모두 입력해줍니다.
```

<br>

```
매크로 스크립트를 실행 후 포킹한 프로젝트에 가서 Actions를 활성화 합니다.

활성화 후 다음과 같은 Github workflows를 실행합니다. (윈도우 파워쉘 스크립트)
```

```
gh auth login
gh workflow run "Azure deploy" --repo {{자신의 github id}}/IUS
```
