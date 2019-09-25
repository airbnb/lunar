/* eslint-disable camelcase */

export type ProofreadRuleMatch = {
  message?: string;
  short_message?: string;
  offset?: number;
  length?: number;
  found?: string;
  replacements?: Array<string>;
  rule_id?: string;
};

export type ProofreaderParams = {
  text: string;
  locale: string;
  action: 'check';
};

export type ProofreaderResponse = {
  proofread: {
    matches: ProofreadRuleMatch[];
  };
};

export type DefinitionShape = {
  locale: string;
  label: string;
};

export type ExtraProofreadProps = {
  isRuleHighlighted?: (rule: ProofreadRuleMatch) => boolean;
  isRuleSecondary?: (rule: ProofreadRuleMatch) => boolean;
};
