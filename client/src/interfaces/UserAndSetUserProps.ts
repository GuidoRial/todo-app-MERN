import { User } from "./User";

export interface UserAndSetUserProps {
    user: {
        token: string;
        user: {
            username: string;
        };
    };
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
