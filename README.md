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

## 시작하기
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
gh workflow run "Azure deploy" --repo $GITHUB_ID/IUS
```