export enum EActionType {
  // Group actions 
  JOIN_GROUP_REQUEST = "JOIN_GROUP_REQUEST",
  JOIN_GROUP_REJECTED = "JOIN_GROUP_REJECTED",
  JOINED_GROUP = "JOINED_GROUP",

  // Periodic contribution actions
  PERIODIC_CONTRIBUTION_TRANSACTION_SUCCESS = "PERIODIC_CONTRIBUTION_TRANSACTION_SUCCESS",
  PERIODIC_CONTRIBUTION_TRANSACTION_FAILURE = "PERIODIC_CONTRIBUTION_TRANSACTION_FAILURE",

  // Loan actions
  LOAN_REQUESTED = "LOAN_REQUESTED",
  LOAN_REJECTED = "LOAN_REJECTED",
  LOAN_APPROVED = "LOAN_APPROVED",
  LOAN_CANCELED = "LOAN_CANCELED",
  LOAN_PAID = 'LOAN_PAID',
  LOAN_PAYMENT_PENDING = 'LOAN_PAYMENT_PENDING',
  LOAN_PARTIALLY_PAID = 'LOAN_PARTIALLY_PAID',
  LOAN_DELAYED = 'LOAN_DELAYED',
  // Periodic earn actions
  RECEIVED_PERIODIC_EARN = "RECEIVED_PERIODIC_EARN",

  // Contribution term
  CONTRIBUTION_TERM_OPENED = "CONTRIBUTION_TERM_OPENED",
  CONTRIBUTION_TERM_CLOSED = "CONTRIBUTION_TERM_CLOSED",
  CONTRIBUTION_TERM_UPDATED = "CONTRIBUTION_TERM_UPDATED",

}