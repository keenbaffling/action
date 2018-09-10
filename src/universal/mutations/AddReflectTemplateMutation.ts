import {commitMutation, graphql} from 'react-relay'
import Atmosphere from 'universal/Atmosphere'
import {CompletedHandler, ErrorHandler} from '../types/relayMutations'
import ISelectRetroTemplateOnMutationArguments = GQL.ISelectRetroTemplateOnMutationArguments
import {RETROSPECTIVE} from 'universal/utils/constants'

graphql`
  fragment AddReflectTemplateMutation_team on SelectRetroTemplatePayload {
    retroMeetingSettings {
      id
      selectedTemplateId
    }
  }
`

const mutation = graphql`
  mutation AddReflectTemplateMutation($teamId: ID!, $selectedTemplateId: ID!) {
    selectRetroTemplate(teamId: $teamId, selectedTemplateId: $selectedTemplateId) {
      ...AddReflectTemplateMutation_team @relay(mask: false)
    }
  }
`

const AddReflectTemplateMutation = (
  atmosphere: Atmosphere,
  variables: ISelectRetroTemplateOnMutationArguments,
  _context: {},
  onError: ErrorHandler,
  onCompleted: CompletedHandler
) => {
  return commitMutation(atmosphere, {
    mutation,
    variables,
    onCompleted,
    onError,
    optimisticUpdater: (store) => {
      const {selectedTemplateId, teamId} = variables
      const team = store.get(teamId)
      if (!team) return
      const meetingSettings = team.getLinkedRecord('meetingSettings', {meetingType: RETROSPECTIVE})
      if (!meetingSettings) return
      meetingSettings.setValue(selectedTemplateId, 'selectedTemplateId')
    }
  })
}

export default AddReflectTemplateMutation
