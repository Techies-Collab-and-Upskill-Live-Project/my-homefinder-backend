export interface RepostOptions {
  updatePrice?: number;
  updateDescription?: string;
  updateTitle?: string;
  makeAvailable?: boolean;
}

export interface RepostResult {
  success: boolean;
  message: string;
  originalProperty?: any;
  repostedProperty?: any;
}

export interface RepostHistory {
  id: string;
  originalPropertyId: string;
  repostedPropertyId: string;
  repostDate: Date;
  userId: string;
  changeLog?: Record<string, any>;
}