import { Item } from '../models/item.model.js';
import { validateCombinationLength } from '../utils/validator.js';

export class CombinationService {
  static generateItems(inputItems) {
    return inputItems.reduce((acc, count, idx) => {
      const prefix = String.fromCodePoint(65 + idx);

      return [
        ...acc,
        ...Array.from(
          { length: count },
          (_, i) =>
            new Item({
              item_code: `${prefix}${i + 1}`,
              prefix,
            }),
        ),
      ];
    }, []);
  }

  static getValidCombinations(items, length) {
    validateCombinationLength(
      items.map((item) => item.prefix),
      length,
    );

    const prefixGroups = items.reduce((groups, item) => {
      groups[item.prefix] = groups[item.prefix] || [];
      groups[item.prefix].push(item);

      return groups;
    }, {});

    const result = [];
    const prefixes = Object.keys(prefixGroups);

    const backtrack = (startIdx, current) => {
      if (current.length === length) {
        result.push([...current]);

        return;
      }

      for (let i = startIdx; i < prefixes.length; i++) {
        const prefix = prefixes[i];

        for (const item of prefixGroups[prefix]) {
          current.push(item);
          backtrack(i + 1, current);
          current.pop();
        }
      }
    };

    backtrack(0, []);

    return result;
  }

  static flattenCombinations(combinations) {
    return combinations.flat();
  }

  static formatCombinations(combinations) {
    return combinations.map((combination) => combination.map((item) => item.itemCode));
  }
}
