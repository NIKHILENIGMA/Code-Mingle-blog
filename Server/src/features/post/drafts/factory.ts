import DraftService from './draft.service'
import previewDraftService from './repository/prisma.draft.repository'

export const draftServiceFactory = () => {
    return new DraftService(previewDraftService)
}
