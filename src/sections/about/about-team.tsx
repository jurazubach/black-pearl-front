import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Image from 'src/components/image';
import ContainerTitle from 'src/components/container-title';

const members = [
  { title: 'Юрій Зубач', position: 'Розробник', image: 'jura.png' },
  { title: 'Ольга Зубач', position: 'Дизайнер', image: 'olia.png' },
  { title: 'Артем Пляхтур', position: 'Виробництво', image: 'artem.png' },
];

export default function AboutTeam() {
  return (
    <Box sx={{ mb: 6 }}>
      <ContainerTitle
        center
        title="Головне – чудова команда"
        description="Ми - команда ентузіастів, яка прагне об'єднати елегантність, вишуканість та перлину дизайну в одному бренді. Наша місія - перетворити вишуканість в творчість та зручність в образ, що говорить за вас."
      />

      <Container maxWidth="xl">
        <Stack direction="row" spacing={3} justifyContent="center" sx={{ mt: 6 }}>
          {members.map((member) => (
            <MemberCard member={member} key={member.title} />
          ))}
        </Stack>
      </Container>
    </Box>

  );
}

type MemberCardProps = {
  member: {
    title: string;
    position: string | undefined;
    image: string;
  };
};

function MemberCard({ member }: MemberCardProps) {
  const { title, position, image } = member;

  return (
    <Card key={title} sx={{ p: 3 }}>
      <Typography variant="h5">
        {title}
      </Typography>

      <Typography variant="body2" sx={{ mb: 2.5 }}>
        {position}
      </Typography>

      <Box sx={{ overflow: 'hidden', height: '420px', width: '340px', }}>
        <Image alt={title} src={`/assets/images/about/${image}`} />
      </Box>
    </Card>
  );
}
