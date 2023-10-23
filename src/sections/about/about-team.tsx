import Box from '@mui/material/Box';
import ContainerTitle from 'src/components/container-title';
import CarouselAboutTeam from 'src/sections/_examples/extra/carousel-view/carousel-about-team';

const members = [
  { title: 'Юрій', position: 'Розробник', imageSrc: 'jura.png' },
  { title: 'Ольга', position: 'Дизайнер', imageSrc: 'olia.png' },
  { title: 'Артем', position: 'Виробництво', imageSrc: 'artem.png' },
];

export default function AboutTeam() {
  return (
    <Box>
      <ContainerTitle
        center
        title="Головне – чудова команда"
        description="Ми - команда ентузіастів, яка прагне об'єднати елегантність, вишуканість та перлину дизайну в одному бренді. Наша місія - перетворити вишуканість в творчість та зручність в образ, що говорить за вас."
      />

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CarouselAboutTeam members={members} />
      </Box>
    </Box>
  );
}
