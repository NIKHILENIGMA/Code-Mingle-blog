import { ApiError } from '../../utils/ApiError'
import { AsyncHandler } from '../../utils/AsyncHandler'
import { NextFunction, Response } from 'express'
import { responseMessage } from '../../constant'
import { ApiResponse } from '../../utils/ApiResponse'
import { ProtectedRequest } from '../../types/extended/app-request'
// import { User } from '../../Lib/Models/User'
import AIService from './ai.service'
import { Prompt } from './ai.types'
import { promptSchema } from './ai.schema'
import { validateBody } from '../../utils/Validations'
import { PromptType, ToneType } from '@/types/common/base.types'
// import { response } from './ai.dummyContent'

const aiService = new AIService()
const {
    INTERNAL_SERVICE,
    SUCCESS,
    // UNAUTHORIZED,
    // METHOD_FAILED
    BAD_REQUEST
} = responseMessage

export const simplifiedTheText = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // Request body validation
    validateBody(promptSchema, req.body)

    const { text } = req.body as Prompt

    try {
        const chatGPTResponse = await aiService.simplifyTextService(req, next, text)

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Text Simlified successfully').message, chatGPTResponse)
    } catch (error) {
        return ApiError(
            error instanceof Error ? error : new Error(INTERNAL_SERVICE('Failed to get GPT response').message),
            req,
            next,
            INTERNAL_SERVICE().code
        )
    }
})

export const changeTone = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // Request body validation
    validateBody(promptSchema, req.body)

    const { text, type } = req.body as Prompt

    if (!type) {
        return ApiError(new Error(BAD_REQUEST('Tone type is required').message), req, next, BAD_REQUEST().code)
    }

    try {
        const chatGPTResponse = await aiService.toneChangeService(req, next, text, type)

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Tone Changed successfully').message, chatGPTResponse)
    } catch (error) {
        return ApiError(
            error instanceof Error ? error : new Error(INTERNAL_SERVICE('Failed to get GPT response').message),
            req,
            next,
            INTERNAL_SERVICE().code
        )
    }
})

export const translateText = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // Request body validation
    validateBody(promptSchema, req.body)

    const { text, type } = req.body as Prompt

    if (!type) {
        return ApiError(new Error(BAD_REQUEST('Translate type is required').message), req, next, BAD_REQUEST().code)
    }

    try {
        const chatGPTResponse = await aiService.languageTranslateService(req, next, text, type)

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Text translated successfully').message, chatGPTResponse)
    } catch (error) {
        return ApiError(
            error instanceof Error ? error : new Error(INTERNAL_SERVICE('Failed to get GPT response').message),
            req,
            next,
            INTERNAL_SERVICE().code
        )
    }
})

export const makeTextLong = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // Request body validation
    validateBody(promptSchema, req.body)

    const { text } = req.body as Prompt

    try {
        const chatGPTResponse = await aiService.makeTextLongService(req, next, text)

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Text expanded successfully').message, chatGPTResponse)
    } catch (error) {
        return ApiError(
            error instanceof Error ? error : new Error(INTERNAL_SERVICE('Failed to get GPT response').message),
            req,
            next,
            INTERNAL_SERVICE().code
        )
    }
})

export const makeTextShort = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // Request body validation
    validateBody(promptSchema, req.body)

    const { text } = req.body as Prompt

    try {
        const chatGPTResponse = await aiService.makeTextShortService(req, next, text)

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Text condensed successfully').message, chatGPTResponse)
    } catch (error) {
        return ApiError(
            error instanceof Error ? error : new Error(INTERNAL_SERVICE('Failed to get GPT response').message),
            req,
            next,
            INTERNAL_SERVICE().code
        )
    }
})

export const generateAiContent = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // Request body validation
    // validateBody(promptSchema, req.body)
    const { text, tone, type } = req.body as {
        text: string
        tone: ToneType
        type: PromptType
    }

    const options = {
        text,
        tone,
        type
    }

    try {
        const chatGPTResponse = await aiService.generateContent(req, next, options)

        if (!chatGPTResponse) {
            return ApiError(new Error(INTERNAL_SERVICE('No response got from gpt').message), req, next, INTERNAL_SERVICE().code)
        }
        // chatGPTResponse?.data?.choices[0]?.message?.content || ''
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('AI Content generated successfully').message, {
            chatGPTResponse
        })

        // Testing purpose only
        //choices[0]?.message?.content
        // const vari = options
        // await Promise.resolve(
        //     setTimeout(() => {
        //         return ApiResponse(req, res, SUCCESS().code, SUCCESS('AI Content generated successfully').message, {
        //             vari,
        //             chatGPTResponse: {
        //                 choices: [
        //                     {
        //                         message: {
        //                             content: response
        //                         }
        //                     }
        //                 ]
        //             }
        //         })
        //     }, 5000)
        // )
    } catch (error) {
        return ApiError(
            error instanceof Error ? error : new Error(INTERNAL_SERVICE('Failed to get GPT response').message),
            req,
            next,
            INTERNAL_SERVICE().code
        )
    }
})

// data: {
//     text: vari.text,
//     tone: vari.tone,
//     type: vari.type,
//     choices: [
//         {
//             message: {
//                 role: 'user',
//                 content:
//                     '# Writing a Blog on React 19: Key Points and Structure ## Introduction React, developed and maintained by Facebook, is one of the most prominent libraries for building user interfaces, particularly for single-page applications. As the web development landscape continually evolves, significant updates to React, such as the forthcoming React 19, can have a profound impact on developers and businesses alike. This blog aims to provide detailed insights into the new features, enhancements, and overall implications of React 19. ## 1. Overview of React - **Brief History**: Introduced in 2013, React has transformed the way developers create user interfaces through its component-based architecture. - **Popularity**: As one of the most widely embraced frameworks, a vast ecosystem has emerged around React, including libraries such as Redux and React Router. ## 2. What’s New in React 19? - **Enhanced Performance**: React 19 is expected to introduce optimization algorithms, ensuring that re-renders are minimized. For instance, the new concurrent rendering feature allows React to work on multiple tasks simultaneously, improving fluidity and speed. - **Server Components**: With the introduction of server components, developers can leverage server-side rendering more efficiently. This would allow for streamlined data fetching and reduced client-side bundle sizes, thus, improving load times. - **Improved Developer Experience**: Enhanced debugging tools and a revamped developer interface will be integral to React 19, allowing developers to track state changes more effectively. The inclusion of hooks at the component level may lead to cleaner and more concise code. ## 3. Benefits of Upgrading to React 19 - **Performance Boost**: With prioritization of rendering tasks, applications can achieve a noticeable speed improvement, which is critical in maintaining user engagement. - **Code Quality**: The shift towards more functional programming paradigms, including better support for hooks, promotes cleaner, more maintainable code, reducing technical debt effectively. - **Community and Ecosystem**: With each new release, the growth of the React community fosters innovation and collaboration, making it easier for developers to find solutions and best practices. ## 4. Challenges and Considerations - **Learning Curve**: Transitioning from earlier versions of React to React 19 may require an adjustment period for developers accustomed to the existing paradigms. It’s crucial to offer guidance and educational resources. - **Compatibility**: Existing projects may face challenges with dependencies. Developers should assess third-party libraries for compatibility with React 19 before migrating. - **Planning and Testing**: Businesses should have a robust migration strategy, including extensive testing to ensure smooth transitions. ## 5. Case Studies/Examples - **Successful Migrators**: Highlight organizations that have successfully upgraded to React 19, detailing the strategies they employed and the subsequent benefits realized. - **Performance Metrics**: Provide quantitative comparisons demonstrating the performance improvements observed from moving to React 19, citing relevant statistics. ## 6. Conclusion The advent of React 19 promises to transform the landscape of web development with a host of enhancements aimed at improving performance and developer experience. As the adoption of new technologies is often accompanied by both opportunities and challenges, it is essential for developers and businesses to remain informed and prepared for an efficient transition. Keeping abreast of these changes, whether through continued education or practical application, will ensure that they can leverage React 19’s capabilities to their fullest potential. ## Call to Action Encourage readers to share their thoughts on the upcoming features of React 19. Invite comments regarding their experiences with previous updates and how they plan to adapt to the changes. ## Final Thoughts As React evolves, the commitment to empowering developers while enhancing user experiences remains paramount. Engaging with new technologies is not just about keeping pace; it’s about propelling oneself forward in a fast-evolving digital landscape. Therefore, readers are urged to stay informed, embrace the changes, and contribute to a vibrant community centered on innovation. --- This structured approach delineates key points and logically organizes them for clarity, engaging readers while providing substantial information regarding React 19.'
//             }
//         }
//     ]
// }
