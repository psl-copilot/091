import type { DatabaseManagerInstance, LoggerService, ManagerConfig } from '@tazama-lf/frms-coe-lib';
import type { RuleConfig, RuleRequest, RuleResult } from '@tazama-lf/frms-coe-lib/lib/interfaces';

export type RuleExecutorConfig = Required<Pick<ManagerConfig, 'rawHistory' | 'eventHistory' | 'configuration' | 'localCacheConfig'>>;

export async function handleTransaction(
  req: RuleRequest,
  determineOutcome: (value: number, ruleConfig: RuleConfig, ruleResult: RuleResult) => RuleResult,
  ruleRes: RuleResult,
  loggerService: LoggerService,
  ruleConfig: RuleConfig,
  databaseManager: DatabaseManagerInstance<RuleExecutorConfig>,
): Promise<RuleResult> {
  
  if (!ruleConfig.config.bands) {
    throw new Error('Invalid config provided - bands not provided');
  }
  if (!ruleConfig.config.exitConditions) {
    throw new Error('Invalid config provided - exitConditions not provided');
  }

  var amount = req.transaction.FIToFIPmtSts.TxInfAndSts.ChrgsInf[2].Amt.Amt;

  return determineOutcome(amount, ruleConfig, ruleRes);
  
}