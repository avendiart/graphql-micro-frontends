import { Button, Stack } from 'components'
import {
  SubmissionsDocument,
  useCreateSubmissionMutation,
  useSubmissionsQuery,
} from '../graphql/module'
import { View, Text } from 'react-native'

export const Submit = () => {
  const { data } = useSubmissionsQuery()
  const [createSubmission] = useCreateSubmissionMutation({
    refetchQueries: [SubmissionsDocument],
  })

  return (
    <Stack
      style={{
        padding: 16,
      }}
    >
      <Button
        onPress={() => {
          createSubmission()
        }}
      >
        Create submission
      </Button>
      <Stack
        style={{
          margin: 0,
        }}
      >
        {data?.submissions.map((submission) => (
          <View
            style={{
              paddingHorizontal: 24,
              paddingVertical: 16,
              borderRadius: 2,
              backgroundColor: '#cccccc',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                lineHeight: 24,
              }}
            >
              {submission.id}
            </Text>
          </View>
        ))}
      </Stack>
    </Stack>
  )
}
