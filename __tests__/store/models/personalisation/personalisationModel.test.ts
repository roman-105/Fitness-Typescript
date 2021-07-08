import { RootModel } from '../../../../src/store/models/index';
import BFAxios from '../../../../src/services/BFAxios';
import MockAdapter from 'axios-mock-adapter';
import BFErrorTracking from '../../../../src/utils/tools/errorTracking';
import PersonalisationAdapter from '../../../../src/store/models/personalisation/personalisationModelAdapter';
import { NO_PERSONALISATION_ERROR } from '../../../../src/store/models/personalisation/personalisationModelAdapter';
import {
  IPersonalisation,
  IPersonalisationQuestion
} from '../../../../src/store/models/personalisation/personalisationModelAdapter';
import {
  personalisationResponseMock,
  personalisationQuestionsResponseMock
} from '../../../../__testConstants__/personalisationResponseMock';
import {
  personalisationModel,
  PersonalisationModelState
} from '../../../../src/store/models/personalisation/personalisationModel';

const recordErrorStub = jest.spyOn(BFErrorTracking, 'recordError');
const transformPersonalisationStub = jest.spyOn(PersonalisationAdapter, 'transformPersonalisation');
const transformQuestionsStub = jest.spyOn(PersonalisationAdapter, 'transformQuestions');

const BFAxiosMock = new MockAdapter(BFAxios);

const rootModel: Pick<RootModel, 'personalisationModel'> = {
  personalisationModel: { ...personalisationModel }
};

let initialPersonalisationState: PersonalisationModelState = { ...personalisationModel.state };

const personalisationMock = personalisationResponseMock as IPersonalisation;
const personalisationQuestionsMock = personalisationQuestionsResponseMock as IPersonalisationQuestion[];

describe('memberModel tests', () => {
  beforeEach(() => {
    rootModel.personalisationModel = require('../../../../src/store/models/personalisation').personalisationModel;
    initialPersonalisationState = { personalisation: undefined, questions: undefined };
  });

  afterEach(() => {
    BFAxiosMock.reset();
    recordErrorStub.mockReset();
    transformPersonalisationStub.mockReset();
    transformQuestionsStub.mockReset();
  });

  describe('reducers', () => {
    it('setPersonalisation should store the personalisation', () => {
      const result: PersonalisationModelState = rootModel.personalisationModel.reducers.setPersonalisation(
        initialPersonalisationState,
        { personalisation: personalisationMock }
      );
      expect(result.personalisation).toEqual(personalisationMock);
    });
    it('setQuestions should store the questions', () => {
      const result: PersonalisationModelState = rootModel.personalisationModel.reducers.setQuestions(
        initialPersonalisationState,
        { questions: personalisationQuestionsMock }
      );
      expect(result.questions).toEqual(personalisationQuestionsMock);
    });
    it('setPersonalisationQuestions should only the questions in personalisation data', () => {
      const result: PersonalisationModelState = rootModel.personalisationModel.reducers.setPersonalisationQuestions(
        initialPersonalisationState,
        { questions: personalisationQuestionsMock }
      );
      expect(result.personalisation?.questions).toEqual(personalisationQuestionsMock);
    });
  });

  describe('effects', () => {
    it('getPersonalisation should store personalisation data in store', async () => {
      const dispatch: any = { personalisationModel: { setPersonalisation: jest.fn() } };
      BFAxiosMock.onGet(/member\/personalisation/).reply(200, personalisationMock);
      transformPersonalisationStub.mockReturnValue(personalisationMock);

      await rootModel.personalisationModel.effects(dispatch).getPersonalisation();

      expect(dispatch.personalisationModel.setPersonalisation).toHaveBeenCalled();
      expect(dispatch.personalisationModel.setPersonalisation).toHaveBeenCalledWith({
        personalisation: personalisationMock
      });
      expect(recordErrorStub).not.toHaveBeenCalled();
    });
    it('getPersonalisation return custom key when personalisation not found', async () => {
      const dispatch: any = { personalisationModel: { setPersonalisation: jest.fn() } };
      BFAxiosMock.onGet(/member\/personalisation/).reply(404);

      await expect(
        rootModel.personalisationModel.effects(dispatch).getPersonalisation()
      ).rejects.toThrowError(NO_PERSONALISATION_ERROR);

      expect(dispatch.personalisationModel.setPersonalisation).not.toHaveBeenCalled();

      expect(recordErrorStub).not.toHaveBeenCalled();
    });
    it('getPersonalisation should record error if unexpected error happens', async () => {
      const dispatch: any = { personalisationModel: { setPersonalisation: jest.fn() } };
      BFAxiosMock.onGet(/member\/personalisation/).reply(500);

      await rootModel.personalisationModel.effects(dispatch).getPersonalisation();

      expect(dispatch.personalisationModel.setPersonalisation).not.toHaveBeenCalled();

      expect(recordErrorStub).toHaveBeenCalled();
    });
    it('getQuestions should store questions data in store', async () => {
      const dispatch: any = { personalisationModel: { setQuestions: jest.fn() } };
      BFAxiosMock.onGet(/member\/questions/).reply(200, personalisationQuestionsMock);
      transformQuestionsStub.mockReturnValue(personalisationQuestionsMock);

      await rootModel.personalisationModel.effects(dispatch).getQuestions();

      expect(dispatch.personalisationModel.setQuestions).toHaveBeenCalled();
      expect(dispatch.personalisationModel.setQuestions).toHaveBeenCalledWith({
        questions: personalisationQuestionsMock
      });
      expect(recordErrorStub).not.toHaveBeenCalled();
    });
    it('getQuestions should record error if unexpected error happens', async () => {
      const dispatch: any = { personalisationModel: { setQuestions: jest.fn() } };
      BFAxiosMock.onGet(/member\/questions/).reply(500);

      await rootModel.personalisationModel.effects(dispatch).getQuestions();

      expect(dispatch.personalisationModel.setQuestions).not.toHaveBeenCalled();

      expect(recordErrorStub).toHaveBeenCalled();
    });
    it('updatePersonalisation not throw error is goes ok', async () => {
      BFAxiosMock.onPut(/member\/personalisation/).reply(200);

      await rootModel.personalisationModel.effects({} as any).updatePersonalisation({}, {
        personalisationModel: { personalisation: personalisationMock }
      } as any);

      expect(recordErrorStub).not.toHaveBeenCalled();
    });
    it('updatePersonalisation should record error if unexpected error happens', async () => {
      BFAxiosMock.onPut(/member\/personalisation/).reply(500);

      await rootModel.personalisationModel.effects({} as any).updatePersonalisation({}, {
        personalisationModel: { personalisation: personalisationMock }
      } as any);

      expect(recordErrorStub).toHaveBeenCalled();
    });
  });
});
