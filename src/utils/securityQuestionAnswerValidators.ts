export function doesNotContainSpecialCharacters(answer: string) {
    return /^[^|&;$%@"”<>()+\\]+$/.test(answer);
}

export function doesNotMatchQuestion(answer: string, question: string) {
    const lowercaseAnswer = answer ? answer.toLowerCase() : '';
    const lowercaseQuestion = question ? question.toLowerCase() : '';
    return lowercaseAnswer !== lowercaseQuestion;
}

export function hasAtLeastFourCharacters(answer: string) {
    return answer.length >= 4;
}
