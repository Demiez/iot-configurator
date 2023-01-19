import { IIdentifier } from '../../../interfaces';

export abstract class Identifier implements IIdentifier {
  id?: string;
  _id?: string;

  protected populateIds(object: IIdentifier) {
    const { id, _id } = object;

    if (id) {
      this.id = id;
      this._id = id;
    }

    if (_id) {
      this.id = _id;
      this._id = id;
    }
  }
}
