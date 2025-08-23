import { ENUMS } from '@/types'
import PublishService from '../publish.service'

describe('Publish Service', () => {
    it('should publish a post successfully', async () => {
        const userId = 'user123'
        const postId = 'post123'
        const payload = {
            slug: 'my-first-post',
            categoryId: 1,
            status: ENUMS.DRAFT_STATUS.PUBLISHED as ENUMS.DRAFT_STATUS.PUBLISHED,
            tags: ['tag1', 'tag2']
        }

        const publishService = new PublishService()
        const result = await publishService.publishPost(userId, postId, payload)

        expect(result).toBeDefined()
        expect(result).toHaveProperty('id', postId)
    })
})
