
type userData = {
    name: string;
    email: string;
    password: string;
    uid: string;
}

type journal = {
    journalName: string;
    journalNameIV: string;
    createdDate: string;
    journalId: string;
    uid: string;
};

type goal = {
    goalText: string;
    goalTextIV: string;
    goalId: string;
    journalId: string;
};
  
type entry = {
  entryDate: string;
  entryLabel: string;
  entryLabelIV: string;
  entryId: string;
  journalId: string;
};

type tag = {
  tagText: string;
  tagTextIV: string;
  tagId: string;
  entryId: string;
};

type note = {
  noteTitle: string;
  noteTitleIV: string;
  noteText: string;
  noteTextIV: string;
  noteId: string;
  entryId: string;
};

export type { userData, journal, goal, entry, tag, note };