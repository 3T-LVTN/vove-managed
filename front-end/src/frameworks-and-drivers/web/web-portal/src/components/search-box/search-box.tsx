import React, {useEffect, useState} from "react";
import {Input, Popover, SelectItemProps, Text} from "@mantine/core";
import {IconSearch} from "@tabler/icons-react";
import usePlacesAutocomplete, {
  getDetails,
} from "use-places-autocomplete";

export interface SearchBoxProps {
  readonly setSelected: (place: google.maps.LatLngLiteral) => void;
  readonly setIsSelected: (isSelected: boolean) => void;
}

interface PlaceProps extends SelectItemProps {
  place_id: string;
}

export const SearchBox = (props: SearchBoxProps) => {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>();

  useEffect(() => {
    if (selectedPlaceId) {
      fetchPlaceResult(selectedPlaceId)
        .then((place) => {
          console.log(place);
          setValue(place.formatted_address ?? "", false);
          props.setSelected({
            lat: place.geometry?.location?.lat() ?? 0,
            lng: place.geometry?.location?.lng() ?? 0,
          });
          clearSuggestions();
        })
        .then(() => {
          props.setIsSelected(true);
        });
    }
  }, [selectedPlaceId]);

  const {
    ready,
    value,
    setValue,
    suggestions: {status, data},
    clearSuggestions,
  } = usePlacesAutocomplete();

  const fetchPlaceResult = async (place_id: string) => {
    return getDetails({placeId: place_id}) as google.maps.places.PlaceResult;
  };

  return (
    <Popover opened={popoverOpened} position="bottom" width="90%" transitionProps={{transition: 'pop'}}>
      <Popover.Target>
        <div
          onFocusCapture={() => setPopoverOpened(true)}
          onBlurCapture={() => setTimeout(() => setPopoverOpened(false), 100)}
        >
          <Input
            icon={<IconSearch/>}
            placeholder="Search an adress"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            radius="md"
            disabled={!ready}
          />
        </div>
      </Popover.Target>
      <Popover.Dropdown p="3px">
        {status === "OK" &&
          data.map(({place_id, description}) => (
            // <div onClick={handleSelect} key={place_id}>
            //   <Text>{description}</Text>
            //   <Divider size="xs" color="gray.2" />
            // </div>
            // TODO: User can click on an option and can show Maker
            <Text
              key={place_id}
              onClick={() => {
                setSelectedPlaceId(place_id)
              }}
              sx={{
                cursor: "pointer",
                '&:hover': {
                  backgroundColor: '#eee',
                },
              }}
              p="xs"
            >
              {description}
            </Text>
          ))}
      </Popover.Dropdown>
    </Popover>
  );
}

export default SearchBox;
