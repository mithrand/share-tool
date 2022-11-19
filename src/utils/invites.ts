import { Invite } from "../types";

export const getFullName = (invite: Invite) => [invite.firstName, invite.lastName].filter(name => !!name).join(' ')