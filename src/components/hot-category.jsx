/* eslint-disable react/prop-types */
import styled from 'styled-components';

const MenuItemContainer = styled.div`
  height: ${({ size }) => (size === 'large' ? '380px' : '240px')};
  min-width: 30%;
  overflow: hidden;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 7.5px 15px;
  overflow: hidden;
  position: relative; /* Added position relative for proper absolute positioning */

  &:hover {
    cursor: pointer;

    & .background-image {
      transform: scale(1.1);
      transition: transform 1s cubic-bezier(0.25, 0.45, 0.45, 0.95);
    }

    & .content {
      opacity: 0.9;
    }
  }

  &:first-child {
    margin-right: 7.5px;
  }

  &:last-child {
    margin-left: 7.5px;
  }
`;

const BackgroundImageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
`;

const ContentContainer = styled.div`
  height: 90px;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  opacity: 0.7;
  position: absolute;
  bottom: 0; /* Added to position content at the bottom */
  left: 0; /* Added to position content at the left */
  right: 0; /* Added to position content at the right */
  transition: opacity 0.3s; /* Added transition for opacity */
`;

const ContentTitle = styled.span`
  font-weight: bold;
  margin-bottom: 6px;
  font-size: 22px;
`;

const ContentSubtitle = styled.span`

  font-size: 16px;
  color: #ef4444;
`;

const MenuItem = ({ title, imageUrl, size }) => (
  <MenuItemContainer size={size}>
    <BackgroundImageContainer className='background-image' imageUrl={imageUrl} />
    <ContentContainer className='content'>
      <ContentTitle>{title}</ContentTitle>
      <ContentSubtitle>SHOP NOW</ContentSubtitle>
    </ContentContainer>
  </MenuItemContainer>
);

const HotCategoriesBar = () => {
  const hotCategories = [
    { id: 1, title: 'Food Additives', imageUrl: 'https://images.pexels.com/photos/4374575/pexels-photo-4374575.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 2, title: 'Sweetener', imageUrl: 'https://images.pexels.com/photos/13800738/pexels-photo-13800738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 3, title: 'General Chemicals', imageUrl: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 4, title: 'Essential oil', size: 'large', imageUrl: 'https://images.pexels.com/photos/932577/pexels-photo-932577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 5, title: 'Cosmetics', size: 'large', imageUrl: 'https://images.pexels.com/photos/3018845/pexels-photo-3018845.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  ];

  return (
    <div className='w-full flex flex-wrap justify-between px-48 mb-12 max-[768px]:hidden'>
      {hotCategories.map(({ id, ...otherCategoryProps }) => (
        <MenuItem key={id} {...otherCategoryProps} />
      ))}
    </div>
  );
};

export default HotCategoriesBar;
