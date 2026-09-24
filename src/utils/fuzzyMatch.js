/**
 * Normalizes user input string by stripping punctuation, extra spaces, and common articles
 */
export function normalizeString(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()'"?]/g, '')
    .replace(/\s+/g, ' ')
    .replace(/^(the|a|an)\s+/, '');
}

/**
 * Calculates Levenshtein edit distance between two strings
 */
export function levenshteinDistance(a, b) {
  const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));

  for (let i = 0; i <= a.length; i += 1) {
    matrix[0][i] = i;
  }
  for (let j = 0; j <= b.length; j += 1) {
    matrix[j][0] = j;
  }

  for (let j = 1; j <= b.length; j += 1) {
    for (let i = 1; i <= a.length; i += 1) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + indicator // substitution
      );
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Evaluates a guess against a target answer and its accepted aliases.
 * Returns: { isCorrect: boolean, isClose: boolean, matchedName: string, distance: number }
 */
export function checkAnswer(userGuess, targetAnswer, aliases = []) {
  const normGuess = normalizeString(userGuess);
  if (!normGuess) {
    return { isCorrect: false, isClose: false, distance: Infinity };
  }

  const targets = [targetAnswer, ...aliases].map(normalizeString).filter(Boolean);

  let bestDistance = Infinity;
  let bestTarget = targetAnswer;

  for (const target of targets) {
    // Direct match
    if (normGuess === target) {
      return { isCorrect: true, isClose: false, matchedName: target, distance: 0 };
    }

    // Substring match for multi-word answers if length is substantial
    if (target.length > 5 && normGuess.length >= 4) {
      if (target.includes(normGuess) || normGuess.includes(target)) {
        // If guess is a large substring of target or vice versa
        const lenDiff = Math.abs(target.length - normGuess.length);
        if (lenDiff <= 3) {
          return { isCorrect: true, isClose: false, matchedName: target, distance: lenDiff };
        }
      }
    }

    const dist = levenshteinDistance(normGuess, target);
    if (dist < bestDistance) {
      bestDistance = dist;
      bestTarget = target;
    }
  }

  // Calculate tolerance based on string length
  const targetLen = bestTarget.length;
  let maxAllowedDist = 1;
  if (targetLen >= 7) maxAllowedDist = 2;
  if (targetLen >= 12) maxAllowedDist = 3;

  if (bestDistance <= maxAllowedDist) {
    // Minor typo -> count as correct!
    return { isCorrect: true, isClose: false, matchedName: bestTarget, distance: bestDistance };
  }

  // Close match feedback threshold (e.g. 1-2 edit distance beyond max allowed)
  const isClose = bestDistance <= maxAllowedDist + 2;

  return {
    isCorrect: false,
    isClose,
    matchedName: bestTarget,
    distance: bestDistance
  };
}
