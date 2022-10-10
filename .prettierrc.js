module.exports = {
  singleQuote: true, // 문자열은 홑따옴표로 formatting
  semi: true, //코드 마지막에 세미콜른이 있게 formatting
  useTabs: false, //탭의 사용을 금하고 스페이스바 사용으로 대체하게 formatting
  tabWidth: 2, // 들여쓰기 너비는 2칸
  trailingComma: 'none', // 오브젝트나 배열 마지막 쉼표(,)를 제거 여부 (none = 제거 | all = 유지)
  printWidth: 150, // 코드 한줄 maximum
  arrowParens: 'avoid', // 화살표 함수가 하나의 매개변수를 받을 때 괄호를 생략
  endOfLine: 'lf', // EoF 방식, OS별로 처리 방식이 다름
  bracketSpacing: true, // 객체 리터럴에서 괄호에 공백 삽입 여부
  htmlWhitespaceSensitivity: 'css', // HTML 공백 감도 설정
  jsxBracketSameLine: true, // JSX의 마지막 `>`를 다음 줄로 내릴지 여부
  jsxSingleQuote: false, // JSX에 singe 쿼테이션 사용 여부
  proseWrap: 'preserve', // markdown 텍스트의 줄바꿈 방식 (v1.8.2)
  quoteProps: 'as-needed', // 객체 속성에 쿼테이션 적용 방식
  rangeStart: 0, // 포맷팅을 부분 적용할 파일의 시작 라인 지정
  rangeEnd: Infinity, // 포맷팅 부분 적용할 파일의 끝 라인 지정,
  requirePragma: false, // 파일 상단에 미리 정의된 주석을 작성하고 Pragma로 포맷팅 사용 여부 지정 (v1.8.0)
  insertPragma: false, // 미리 정의된 @format marker의 사용 여부 (v1.8.0)
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200
      }
    },
    {
      files: '*.conf',
      options: {
        useTabs: false,
        tabWidth: 2
      }
    }
  ]
};
