import prisma from '@/lib/prisma';

export class AuditService {
  static async log(action: string, details: any, userId?: string, ipAddress?: string) {
    try {
      await prisma.auditLog.create({
        data: {
          action,
          details: JSON.stringify(details),
          userId: userId || null,
          ipAddress: ipAddress || null,
        }
      });
    } catch (error) {
      console.error("Failed to write audit log:", error);
    }
  }
}
