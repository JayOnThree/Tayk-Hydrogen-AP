import {useState} from 'react';
import {
  useLocation,
  useSearchParams,
  useTransition,
} from '@remix-run/react';
import {useNavigate} from '@remix-run/react';

// import Arrow from '../assets/arrow.svg'

export default function ProductOptions({options, selectedVariant}) {
  const {pathname} = useLocation();
  const [currentSearchParams] = useSearchParams();
  const [dropDownClicked, setDropDownClicked] = useState();
  const transition = useTransition();
  const navigate = useNavigate();

  const paramsWithDefaults = (() => {
    const defaultParams = new URLSearchParams(currentSearchParams);
    if (!selectedVariant) {
      return defaultParams;
    }
    for (const {name, value} of selectedVariant.selectedOptions) {
      if (!currentSearchParams.has(name)) {
        defaultParams.set(name, value);
      }
    }
    return defaultParams;
  })();
  // Update the in-flight request data from the 'transition' (if available)
  // to create an optimistic UI that selects a link before the request is completed
  const searchParams = transition.location
    ? new URLSearchParams(transition.location.search)
    : paramsWithDefaults;

  return (
    <div style={{width: '100%', position: 'relative', marginTop: '2vh'}}>
      {options.map((option) => {
        if (!option.values.length) {
          return;
        }
        const currentOptionVal = searchParams.get(option.name);
        return (
          <div key={option.name} className="dropdown">
            <div
              className="dropdown-button"
              id="prodOptions"
              onClick={() =>
                setDropDownClicked(
                  dropDownClicked !== undefined ? undefined : option.name,
                )
              }
            >
              <h6 className="dropdownText">{option.name}</h6>
              <img
                src="/arrow.svg"
                className="dropdown-arrow"
                style={{
                  transform:
                    dropDownClicked === option.name
                      ? `rotate(-180deg)`
                      : `rotate(0)`,
                }}
              />
            </div>
            <div className="dropdown-content">
              {dropDownClicked === option.name &&
                option.values.map((value) => {
                  const linkParams = new URLSearchParams(searchParams);
                  const isSelected = currentOptionVal === value;
                  linkParams.set(option.name, value);
                  return (
                    <li
                      key={value}
                      onClick={() => {
                        navigate(`${pathname}?${linkParams.toString()}`);
                        setDropDownClicked(undefined);
                      }}
                      style={{
                        backgroundColor: isSelected ? '#EFEFEF' : 'white',
                        WebkitTextStroke: isSelected ? '2px black' : '0px black',
                      }}
                    >
                      {value}
                    </li>
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
