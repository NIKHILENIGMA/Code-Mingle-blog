import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app/store/store'
import { updateSelectedDraft } from '@/features/drafts/slices/draftSlice'
import DraftTitle from './DraftTitle'
import { EditorRoot } from '@/features/tiptap/components/EditorRoot'

const DraftForm: FC = () => {
  const selectedDraft = useSelector(
    (state: RootState) => state?.draft?.selectedDraft,
  )
  const dispatch = useDispatch()

  return (
    <div className="max-w-4xl p-4 mx-auto md:p-8">
      {/* <hr className="my-2" /> */}
      <DraftTitle
        name="title"
        title={selectedDraft?.title || ''}
        onTitleChange={(newTitle: string) => {
          dispatch(updateSelectedDraft({ ...selectedDraft, title: newTitle }))
        }}
      />
      <div className="flex flex-col w-full h-full p-1 mx-auto mb-16 space-y-3 rounded-lg">
        <EditorRoot />
      </div>
      <div className="flex justify-center my-10 h-[34vh]"></div>
    </div>
  )
}

export default DraftForm
