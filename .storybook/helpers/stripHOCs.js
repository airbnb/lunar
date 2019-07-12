export default function stripHOCs(fullName) {
  if (typeof fullName !== 'string') {
    return fullName;
  }

  let innerName = fullName;

  while (/\([^()]*\)/g.test(innerName)) {
    let HOC = innerName;
    let previousHOC;

    do {
      previousHOC = HOC;
      HOC = previousHOC.replace(/\([^()]*\)/g, '');
    } while (previousHOC !== HOC);

    innerName = innerName.replace(RegExp(`^${HOC}\\(|\\)$`, 'g'), '');
  }

  return innerName;
}
