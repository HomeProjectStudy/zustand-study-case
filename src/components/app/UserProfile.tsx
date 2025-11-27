import { useStore } from '@/store';
import { Avatar, AvatarImage, AvatarFallback } from '../Avatar';
import { Button } from '../Button';
import { Input } from '../Input';
import { useForm } from 'react-hook-form';


export function UserProfile(){
  console.log('UserProfile rendered!');
  const { user, setUsername } = useStore();

  const form = useForm({
    defaultValues: {
      username: user.username,
    },
  });

  const handleSubmit = form.handleSubmit(formData => {
    setUsername(formData.username);
  });


  return (
    <div>
      <Avatar className="mb-4">
        <AvatarImage
          src={`https://github.com/${user.username}.png`}
          alt={`@${user.username}`}
        />
        <AvatarFallback>
          {user.username.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <form className="flex gap-4" onSubmit={handleSubmit}>
        <Input {...form.register('username')} />
        <Button>Salvar</Button>
      </form>
    </div>
  );
}
