import 'server-only';
import { prisma } from './db';
import { getClientIp, getUserAgent } from './http';

// Central audit trail. Every auth event and every content mutation should call
// this. Writes are best-effort: an audit failure must never break the action it
// records (it is logged but swallowed).

export type AuditAction =
  | 'LOGIN_SUCCESS'
  | 'LOGIN_FAILURE'
  | 'LOGIN_LOCKED'
  | 'LOGOUT'
  | 'TOKEN_REFRESH'
  | 'TOKEN_REUSE_DETECTED'
  | 'ACCOUNT_LOCKED'
  // content actions (used from Phase 4 onward)
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'
  | 'PUBLISH';

export interface AuditInput {
  action: AuditAction;
  userId?: string | null;
  targetType?: string | null;
  targetId?: string | null;
  metadata?: Record<string, unknown> | null;
  req?: Request;
  ipAddress?: string | null;
  userAgent?: string | null;
}

export async function logAudit(input: AuditInput): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        action: input.action,
        userId: input.userId ?? null,
        targetType: input.targetType ?? null,
        targetId: input.targetId ?? null,
        metadataJson: (input.metadata ?? undefined) as never,
        ipAddress: input.ipAddress ?? (input.req ? getClientIp(input.req) : null),
        userAgent: input.userAgent ?? (input.req ? getUserAgent(input.req) : null),
      },
    });
  } catch (err) {
    console.error('[audit] failed to write audit log:', err);
  }
}
