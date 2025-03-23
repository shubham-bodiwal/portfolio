import { useState, useEffect, ReactNode } from "react";
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
  background: #1e1e2f;
  color: #fff;
  font-size: 12px;
  border-left: 1px solid #444;
  display: flex;
  flex-direction: column;
`;

const TabBar = styled.div`
  display: flex;
  border-bottom: 1px solid #444;
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 0.5rem;
  background: ${(p) => (p.active ? "#2e2e4d" : "transparent")};
  color: #fff;
  border: none;
  cursor: pointer;
  font-weight: ${(p) => (p.active ? "bold" : "normal")};
  border-right: 1px solid #444;
  &:last-child {
    border-right: none;
  }
  &:hover {
    background: #333352;
  }
`;

const ContentArea = styled.div`
  padding: 1rem;
  overflow-y: auto;
`;

const Pre = styled.pre`
  background-color: #282c34;
  text-wrap: normal;
  padding: 0.5rem;
  border-radius: 4px;
`;

const StyleBlock = styled.div`
  margin-bottom: 1rem;
  border: 1px solid #444;
  padding: 0.5rem;
  border-radius: 6px;
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
  const [activeTab, setActiveTab] = useState<"styles" | "html">("styles");

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
    let pretty = html.replace(/>\s*</g, ">\n<");
    let pad = 0;
    return pretty
      .split("\n")
      .map((line) => {
        if (/^<\/\w/.test(line)) pad = Math.max(pad - 1, 0);
        const indent = "  ".repeat(pad);
        if (/^<\w[^>]*[^\/]>$/.test(line) && !line.match(/<\w+.*?\/>/)) pad++;
        return indent + line;
      })
      .join("\n")
      .trim();
  };

  const getElementDetails = (el: HTMLElement) => {
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
  };

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setDetails(getElementDetails(el));
    };
    document.addEventListener("mouseover", handleMouseOver);
    return () => document.removeEventListener("mouseover", handleMouseOver);
  }, []);

  return (
    <Wrapper>
      <PageContent>{children}</PageContent>

      {details && (
        <InspectorPanel>
          <TabBar>
            <Tab active={activeTab === "styles"} onClick={() => setActiveTab("styles")}>
              Styles
            </Tab>
            <Tab active={activeTab === "html"} onClick={() => setActiveTab("html")}>
              HTML
            </Tab>
          </TabBar>
          <ContentArea>
            <h4>Tag: {details.tagName}</h4>
            <strong>Attributes:</strong>
            <Pre>{JSON.stringify(details.attributes, null, 2)}</Pre>
            <strong>Children:</strong>
            <Pre>{details.children}</Pre>

            {activeTab === "styles" && (
              <>
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
              </>
            )}

            {activeTab === "html" && (
              <>
                <strong>HTML:</strong>
                <Pre>{details.outerHTML}</Pre>
              </>
            )}
          </ContentArea>
        </InspectorPanel>
      )}
    </Wrapper>
  );
}
