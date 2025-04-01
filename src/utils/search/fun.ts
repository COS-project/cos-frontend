/**
 * 한글 문자의 초성을 추출하는 함수
 * @param char - 한글 문자
 * @returns 초성 문자
 */
function getConsonant(char: string): string {
  const consonants: string[] = [
    'ㄱ',
    'ㄲ',
    'ㄴ',
    'ㄷ',
    'ㄸ',
    'ㄹ',
    'ㅁ',
    'ㅂ',
    'ㅃ',
    'ㅅ',
    'ㅆ',
    'ㅇ',
    'ㅈ',
    'ㅉ',
    'ㅊ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅎ',
  ];
  const code: number = char.charCodeAt(0);

  // 한글 유니코드 범위 내에 있는지 확인
  if (code >= 0xAC00 && code <= 0xD7A3) {
    // 초성 인덱스 계산
    const choIndex: number = Math.floor((code - 0xAC00) / 28 / 21);
    return consonants[choIndex];
  }

  // 이미 초성인 경우 그대로 반환
  if (consonants.includes(char)) {
    return char;
  }

  // 한글이 아닌 경우 그대로 반환
  return char;
}

/**
 * 문자가 한글 초성인지 확인하는 함수
 * @param char - 문자
 * @returns 초성 여부
 */
function isConsonant(char: string): boolean {
  const code: number = char.charCodeAt(0);
  return code >= 0x3131 && code <= 0x314E;
}

/**
 * 문자 단위로 입력 쿼리와 텍스트를 비교하여 매칭되는 문자들의 인덱스를 반환
 * @param query - 검색할 쿼리 (초성, 완성형 한글, 영어 등)
 * @param text - 검색 대상 텍스트
 * @returns 매칭된 문자들의 인덱스 배열
 */
export function findMatchingCharacters(query: string | null, text: string): number[] {
  if (!query || !text) {
    return [];
  }

  // 결과 배열 (매칭된 인덱스 저장)
  const matchedIndices: number[] = [];

  // 쿼리의 각 문자 처리
  let queryIndex: number = 0;
  let textIndex: number = 0;

  while (queryIndex < query.length && textIndex < text.length) {
    const queryChar: string = query[queryIndex];
    const textChar: string = text[textIndex];

    // 1. 정확히 일치하는 경우
    if (queryChar === textChar) {
      matchedIndices.push(textIndex);
      queryIndex++;
      textIndex++;
      continue;
    }

    // 2. 초성 검색 (쿼리가 초성인 경우)
    if (isConsonant(queryChar)) {
      const textConsonant: string = getConsonant(textChar);
      if (queryChar === textConsonant) {
        matchedIndices.push(textIndex);
        queryIndex++;
        textIndex++;
        continue;
      }
    }

    // 3. 대소문자 구분 없이 비교 (영어인 경우)
    if (queryChar.toLowerCase() === textChar.toLowerCase()) {
      matchedIndices.push(textIndex);
      queryIndex++;
      textIndex++;
      continue;
    }

    // 일치하지 않으면 다음 텍스트 문자로 이동
    textIndex++;
  }

  // 쿼리의 모든 문자가 매칭되지 않았으면 빈 배열 반환
  return queryIndex === query.length ? matchedIndices : [];
}
