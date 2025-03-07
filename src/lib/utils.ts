export const xpRequirements: { [key: number]: number } = {
  0: 1000,
  1: 1500,
  2: 3500,
  3: 3500,
  4: 4000,
  5: 4000,
  6: 4500,
  7: 4500,
  8: 4500,
  9: 5500,
  10: 5500,
};

export function getXp(level: number): number {
  let xpTotal = 0;
  let xpRequirement = 0;
  let counter = 0;

  for (let x = 0; x < level; x++) {
    xpRequirement = xpRequirements[x] || xpRequirement;

    if (9 <= x && x < 37) {
      counter++;
      if (counter === 3) {
        xpRequirement += 500;
        counter = 0;
      }
    } else if (x === 38 || x === 39) {
      xpRequirement = 11000;
    } else if (x >= 40) {
      xpRequirement += 500;
    }
    xpTotal += xpRequirement;
  }

  return xpTotal;
}

export function getXpForLevel(level: number): number {
  let xpRequirement = 0;
  let counter = 0;

  for (let x = 0; x <= level; x++) {
    xpRequirement = xpRequirements[x] || xpRequirement;

    if (9 <= x && x < 37) {
      counter++;
      if (counter === 3) {
        xpRequirement += 500;
        counter = 0;
      }
    } else if (x === 38 || x === 39) {
      xpRequirement = 11000;
    } else if (x >= 40) {
      xpRequirement += 500;
    }
  }

  return xpRequirement;
}

export function getLevel(xpTotal: number): number {
  let currentXp = 0;
  let level = 0;

  while (currentXp < xpTotal) {
    const xpRequirement = getXpForLevel(level);
    if (currentXp + xpRequirement <= xpTotal) {
      currentXp += xpRequirement;
      level++;
    } else {
      break;
    }
  }

  return level;
}

export function getTotal(levels: number[]): { level: number, xp: number } {
  let totalXp = 0;

  for (const level of levels) {
    totalXp += getXp(level);
  }

  return {
    level: getLevel(totalXp),
    xp: totalXp
  }
}

export function isValid(input: any) {
  return !isNaN(input) && input > 0 && input < 2000;
}