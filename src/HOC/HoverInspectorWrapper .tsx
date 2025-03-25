import { useState, useEffect, ReactNode, useRef, useCallback } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const PageContent = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const InspectorPanel = styled.div`
  width: 400px;
  position: relative;
  background-color: #08101d;
  background-size: cover;
  color: #fff;
  font-size: 12px;
  border-left: 1px solid grey;
  display: flex;
  flex-direction: column;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.2);
    z-index: 0;
    backdrop-filter: blur(1px);
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

const ContentArea = styled.div`
  padding: 1rem;
  overflow-y: auto;
`;

const Pre = styled.pre`
  padding: 0.5rem;
  border-radius: 4px;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: #ddd;
  line-height: 1.4;
`;

const StyleBlock = styled.div`
  margin-bottom: 1rem;
  border: 1px solid #444;
  padding: 0.5rem;
  border-radius: 6px;
  backdrop-filter: blur(3px);
  background-color: #ffffff05;
`;

type ElementDetails = {
  tagName: string;
  attributes: Record<string, string>;
  declaredStyles: Record<string, Record<string, string>>;
  outerHTML: string;
  children: number;
};

type Props = { children: ReactNode };

export default function HoverInspectorWrapper({ children }: Props) {
  const [details, setDetails] = useState<ElementDetails | null>(null);
  const pageContentRef = useRef<HTMLDivElement>(null)

  const getClassStyles = (el: HTMLElement) => {
    const classStyles: Record<string, Record<string, string>> = {};
    const classes = Array.from(el.classList);
    if (!classes.length) return classStyles;

    for (const c of classes) classStyles[c] = {};

    for (const sheet of Array.from(document.styleSheets)) {
      let rules: CSSRuleList;
      try {
        rules = (sheet as CSSStyleSheet).cssRules;
      } catch {
        continue;
      }
      for (const rule of Array.from(rules)) {
        if (rule.type !== CSSRule.STYLE_RULE) continue;
        const styleRule = rule as CSSStyleRule;
        if (!styleRule.selectorText) continue;
        classes.forEach((className) => {
          if (styleRule.selectorText.includes(`.${className}`)) {
            const styleDecl = styleRule.style;
            for (let i = 0; i < styleDecl.length; i++) {
              const propName = styleDecl[i];
              classStyles[className][propName] = styleDecl.getPropertyValue(propName);
            }
          }
        });
      }
    }
    return classStyles;
  };

  const formatHtml = (html: string) => {
    const pretty = html.replace(/>\s*</g, ">\n<");
    let pad = 0;
    return pretty
      .split("\n")
      .map((line) => {
        if (/^<\/\w/.test(line)) pad = Math.max(pad - 1, 0);
        const indent = "  ".repeat(pad);
        if (/^<\w[^>]*[^/]?>$/.test(line) && !line.match(/<\w+.*?\/>/)) pad++;
        return indent + line;
      })
      .join("\n")
      .trim();
  };

  const getElementDetails = useCallback((el: HTMLElement) => {
    if (!el) return null;
    const attributes: Record<string, string> = {};
    Array.from(el.attributes).forEach((attr) => (attributes[attr.name] = attr.value));
    return {
      tagName: el.tagName,
      attributes,
      declaredStyles: getClassStyles(el),
      outerHTML: formatHtml(el.outerHTML),
      children: el.children.length,
    };
  }, []);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setDetails(getElementDetails(el));
    };
    const currentRef = pageContentRef.current;
    currentRef?.addEventListener("mouseover", handleMouseOver);
    return () => currentRef?.removeEventListener("mouseover", handleMouseOver);
  }, [getElementDetails]);

  return (
    <Wrapper>
      <PageContent ref={pageContentRef}>{children}</PageContent>

      {details && (
        <InspectorPanel>
          <ContentArea>
            <h4>Tag: {details.tagName}</h4>
            <StyleBlock>
              <strong>Attributes:</strong>
              <Pre>{JSON.stringify(details.attributes, null, 2)}</Pre>
            </StyleBlock>
            <StyleBlock>
              <strong>Children:</strong>
              <Pre>{details.children}</Pre>
            </StyleBlock>

            <strong>Declared CSS (class-wise):</strong>
            {Object.entries(details.declaredStyles).map(([className, props]) => {
              if (!Object.keys(props).length) return null;
              return (
                <StyleBlock key={className}>
                  <strong>.{className}</strong>
                  <Pre>
                    {Object.entries(props)
                      .map(([prop, val]) => `${prop}: ${val}`)
                      .join("\n")}
                  </Pre>
                </StyleBlock>
              );
            })}
            <StyleBlock>
              <strong>HTML:</strong>
              <Pre>{details.outerHTML}</Pre>
            </StyleBlock>
          </ContentArea>
        </InspectorPanel>
      )}
    </Wrapper>
  );
}
